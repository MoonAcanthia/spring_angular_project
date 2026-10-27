package com.main.repositories;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.main.entities.Users;
import com.main.login.LoginRequest;

@Repository
public interface UserRepository 
{
    void addUser(String user, String password);
    void addEmailAuth(Users user, int token);
    int refreshEmailAuth(Users user);
    Users emailAuth(String token);
    void updateUserAuth(int id);
    int checkPassword(Users user);
    void addPasswordRemind(Users user, int password_token);
    void refreshPasswordReset(Users user);
    void updatePassword(String password_token,String password);
    List<Users> getAllUsers();
    Users getUserById(int id);
    Users getUserByName(String username);
    int deleteUserById(int id);
    Users getUserInfo(LoginRequest loginRequest);
}
