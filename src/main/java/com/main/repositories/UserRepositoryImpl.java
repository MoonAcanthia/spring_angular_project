package com.main.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.main.entities.CustomRowMapper;
import com.main.entities.Users;
import com.main.login.LoginRequest;

@Repository 
public class UserRepositoryImpl implements UserRepository
{
    @Autowired 
    JdbcTemplate jdbcTemplate;

    @Override
    public void addUser(String username,String password)
    {
       jdbcTemplate.update("INSERT INTO users (USERNAME,PASSWORD,ROLE,AUTHENTICATED) VALUES (?,?,?,?)",username,password,"user",false);
    }

    @Override
    public void addEmailAuth(Users user,int token)
    {
        jdbcTemplate.update("INSERT INTO register (ID,TOKEN,AUTH_START,CREATION_TIME) VALUES (?,?,?,?)",user.getId(),token,System.currentTimeMillis(),LocalDate.now());
    }

    @Override
    public int refreshEmailAuth(Users user)
    {
        jdbcTemplate.update("UPDATE register SET AUTH_START=? WHERE id=?",System.currentTimeMillis(),user.getId());
        String authQuery="SELECT token FROM register WHERE id=?";
        int authToken=jdbcTemplate.queryForObject(authQuery, Integer.class,user.getId());
        return authToken;
    }



    @Override
    public Users emailAuth(String auth_token)
    {
        long time=System.currentTimeMillis();
        String authQuery="SELECT * FROM users INNER JOIN register ON users.id=register.id WHERE token=? AND ?-AUTH_START<=900000 AND authenticated=0";
        try
        {
            Users token=jdbcTemplate.queryForObject(authQuery,new CustomRowMapper(),auth_token,time);
            return token;
        }
        catch(EmptyResultDataAccessException e)
        {
           return null;
        }
    }

    @Override
    public void updateUserAuth(int id)
    {
        jdbcTemplate.update("UPDATE users SET AUTHENTICATED=1 WHERE id=?",id);
    }

    @Override
    public int checkPassword(Users user)
    {
        String passwordQuery="SELECT TOKEN FROM password_remind WHERE id=?";
        try
        {
           int token=jdbcTemplate.queryForObject(passwordQuery, Integer.class,user.getId());
           return token;

        }
        catch(EmptyResultDataAccessException e)
        {
            return 0;
        }
        
    }

    @Override
    public void addPasswordRemind(Users user, int password_token)
    {
        jdbcTemplate.update("INSERT INTO password_remind (ID,TOKEN,PASSWORD_START) VALUES (?,?,?)",user.getId(),password_token,System.currentTimeMillis());
    }
   
    @Override
    public void refreshPasswordReset(Users user)
    {
        jdbcTemplate.update("UPDATE password_remind SET PASSWORD_START=? WHERE id=?",System.currentTimeMillis(),user.getId());
    }

    @Override 
    public void updatePassword(String password_token,String password)
    {
       long time=System.currentTimeMillis();
       String findId="SELECT id from password_remind WHERE TOKEN=? AND ?-PASSWORD_START<=900000";
       try
       {
         int userId=jdbcTemplate.queryForObject(findId, Integer.class,password_token,time);
        String updatePassword="UPDATE users SET PASSWORD=? WHERE id=?";
        jdbcTemplate.update(updatePassword,password,userId);
       }
       catch(EmptyResultDataAccessException e)
       {

       }
    }

    @Override
    public List<Users> getAllUsers()
    {
        String allQuery = "SELECT ID,USERNAME,ROLE FROM users"; //change without password
        List <Users> UserList=jdbcTemplate.query(allQuery,new CustomRowMapper());
        return UserList;
    }

    @Override 
    public Users getUserById(int id)
    {
        String idQuery = "SELECT * FROM users WHERE id=?";
        try
        {
            Users idUser=jdbcTemplate.queryForObject(idQuery, new CustomRowMapper(),id);
            return idUser;
        }
        catch(EmptyResultDataAccessException e)
        {
            return null;
        }
    }

    @Override
    public Users getUserByName(String name)
    {
        String idQuery = "SELECT * FROM users WHERE username=?";
        try
        {
            Users nameUser=jdbcTemplate.queryForObject(idQuery, new CustomRowMapper(),name);
            return nameUser;
        }
        catch(EmptyResultDataAccessException e)
        {
            return null;
        }
        
    }

    @Override
    public int deleteUserById(int id)
    {
        String deleteQuery="DELETE FROM users WHERE id=?";
        return jdbcTemplate.update(deleteQuery,id);
    }

    @Override 
    public Users getUserInfo(LoginRequest loginRequest)
    {
        String findQuery="SELECT * FROM users WHERE username=? AND password=?";
        Users findUser=null;
        try 
        {
            findUser=jdbcTemplate.queryForObject(findQuery, new CustomRowMapper(),loginRequest.getUsername(),loginRequest.getPassword());
        }
        catch (EmptyResultDataAccessException e)
        {
            //e.printStackTrace(); //jesli nie ma takiego uzytkownika
        }
        return findUser;
    }

}
