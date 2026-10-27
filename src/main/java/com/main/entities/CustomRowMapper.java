package com.main.entities;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;


/**
 *
 * @author User
 */
public class CustomRowMapper implements RowMapper<Users>
{
    
    @Override
    public Users mapRow(ResultSet rs, int rowNum) throws SQLException 
    {
        Users user = new Users();
        user.setId(rs.getInt("ID"));
        user.setUsername(rs.getString("USERNAME"));
        try 
        {
            user.setPassword(rs.getString("PASSWORD"));
            
        }
        catch (SQLException e)
        {
           
        }
        user.setRole(rs.getString("ROLE"));
        try
        {
            user.setAuthenticated(rs.getBoolean("AUTHENTICATED"));
        }
        catch (SQLException e)
        {
           
        }
        return user;
    }
    
}
