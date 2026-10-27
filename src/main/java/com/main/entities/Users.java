package com.main.entities;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.validation.constraints.NotNull;

public class Users implements UserDetails
{
    private int id;
    private String username;
    
    @NotNull
    private String password;

    private String role;
    private boolean authenticated;

    public Users() 
    {

    }
    public Users(int id,String username, String password, String role, boolean authenticated)
    {
       this.id=id;
       this.username=username;
       this.password=password;
       this.role=role;
       this.authenticated=authenticated;
    }

    @Override
    public String getUsername()
    {
        return username;
    }
    
    public void setUsername(String username)
    {
        this.username=username;
    }

    @Override
    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        this.password=password;
    }

    public int getId()
    {
        return id;
    }
    public void setId(int id)
    {
        this.id = id;
    }

    public String getRole()
    {
        return role;
    }

    public void setRole(String role)
    {
        this.role = role;
    }
    public void setAuthenticated(boolean authenticated)
    {
        this.authenticated=authenticated;
    }

    @Override
    public String toString()
    {
        return "User ID = " + id  +" USERNAME = "+ username + " PASSWORD = " + password + " ROLES = " + role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() 
    {
       return null;
    }

     @Override
    public boolean isAccountNonExpired() 
    {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() 
    {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() 
    {
        return true;
    }

    @Override
    public boolean isEnabled() 
    {
        return this.authenticated;
    }

}