package com.main.controllers;


import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.main.entities.Users;
import com.main.login.LoginRequest;
import com.main.login.LoginResponse;
import com.main.repositories.UserRepository;
import com.main.services.JwtService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;


@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/api")
public class UserController
{

    

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender emailSender;
    
    private final JwtService jwtService= new JwtService();

    Users user;
    LoginResponse token= new LoginResponse();
    //post

    @PostMapping("/register")
    public ResponseEntity<Integer> createAccount(@RequestBody LoginRequest loginRequest) throws MessagingException
    {
       
        String username = loginRequest.getUsername();
        String password=loginRequest.getPassword();
        if(!jwtService.patternMatches(username))
        {
            return ResponseEntity.ok(1);
        }
        else if(!jwtService.passwordValid(password))
        {
            return ResponseEntity.ok(2);
        }
        else
        {
            String text="<a href=http://localhost:4200/auth?auth_token=";
            if(userRepository.getUserByName(username)==null)
            {
                Random rand = new Random();
                int auth_token=0;
                for(int i=1; i<=100000000;i=i*10)
                {
                    int n = rand.nextInt(8);
                    n++;
                    auth_token=auth_token+n*i;
                }
                text+=auth_token+">Authenticate</a>";
                password=jwtService.PasswordEncrypt(password);
                userRepository.addUser(username, password);
                MimeMessage message = emailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");
                helper.setFrom("Patric@domek.com");
                helper.setTo(username);
                helper.setSubject("Welcome");
                helper.setText(text,true);
                try
                {
                    emailSender.send(message);
                    user=userRepository.getUserByName(username);
                    userRepository.addEmailAuth(user,auth_token);
                }
                catch(MailException e)
                {
                
                }
            }
            else 
            {
                String reminder="You tried to create account with email that already exist in our database!";
                MimeMessage message = emailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");
                helper.setFrom("Patric@domek.com");
                helper.setTo(username);
                helper.setSubject("Account");
                helper.setText(reminder,true);
                emailSender.send(message);
            }
        } 
       return ResponseEntity.ok(0);
    }

    @PostMapping("/auth")
    public void authenticateAccount(@RequestBody String auth_token)
    {
        user=userRepository.emailAuth(auth_token);
        if(user!=null)
        {
            userRepository.updateUserAuth(user.getId());
        }
    }

    @PostMapping("/password")
    public void remindPassword(@RequestBody String email) throws MessagingException
    {
        user=userRepository.getUserByName(email);
        if(user!=null)
        {
           int password_token=userRepository.checkPassword(user);
           if( password_token!=0)
           {
                String text="<a href=http://localhost:4200/password-reset?token=";
                text+=password_token+">Reset password</a>";
                MimeMessage message = emailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");
                helper.setFrom("Patric@domek.com");
                helper.setTo(user.getUsername());
                helper.setSubject("Password reset");
                helper.setText(text,true);
                try
                {
                    userRepository.refreshPasswordReset(user);
                    emailSender.send(message);
                }
                catch(MailException e)
                {
                
                }
           }
           else if(password_token==0)
           {
                Random rand = new Random();
                int new_token=0;
                for(int i=1; i<=100000000;i=i*10)
                {
                    int n = rand.nextInt(8);
                    n++;
                    new_token=new_token+n*i;
                }
                userRepository.addPasswordRemind(user,new_token);
                String text="<a href=http://localhost:4200/password-reset?token=";
                text+=new_token+">Reset password</a>";
                MimeMessage message = emailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");
                helper.setFrom("Patric@domek.com");
                helper.setTo(user.getUsername());
                helper.setSubject("Password reset");
                helper.setText(text,true);
                try
                {
                    emailSender.send(message);
                }
                catch(MailException e)
                {
                
                }

           }
        }
    }

    @PostMapping("/password_reset")
    public ResponseEntity<Integer> resetPassword(@RequestBody String[] tablepass)
    {
        System.out.println(tablepass[0]);
        System.out.println(tablepass[1]);
        if(jwtService.passwordValid(tablepass[1]))
        {
            tablepass[1]=jwtService.PasswordEncrypt(tablepass[1]);
            userRepository.updatePassword(tablepass[0], tablepass[1]);
            return ResponseEntity.ok(1);
        }
        else
        {
            return ResponseEntity.ok(2);
        }
    }
    
    @PostMapping("/login")
    public LoginResponse authenticateAndGetToken(@RequestBody LoginRequest loginRequest) throws MessagingException
    { 
        user=userRepository.getUserByName(loginRequest.getUsername());
        if (user!=null) 
        {
            if(jwtService.validatePassword(loginRequest.getPassword(), user))
            {
                if(user.isEnabled())
                {
                    token.setToken(jwtService.generateToken(loginRequest.getUsername(),user));
                    if(jwtService.validateToken(token.getToken(), user))
                    {
                        return token;
                    }
                    else
                    {
                    throw new UsernameNotFoundException("Invalid user request!");
                    }
                }
                else
                {
                    String text="<a href=http://localhost:4200/auth?auth_token=";
                    String reminder="<h2> You try to login with user who is not authenticated, click link below to authenticate<br></h2>";
                    int refreshedToken=userRepository.refreshEmailAuth(user);
                    text+=refreshedToken+">Authenticate</a>";
                    reminder+=text;
                    MimeMessage message = emailSender.createMimeMessage();
                    MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");
                    helper.setFrom("Patric@domek.com");
                    helper.setTo(user.getUsername());
                    helper.setSubject("AccountRemind");
                    helper.setText(reminder,true);
                    emailSender.send(message);
                    throw new UsernameNotFoundException("Invalid user request!");
                }
                
            }
            else
            {
                throw new UsernameNotFoundException("Invalid user request!");
            }
        } 
        else 
        {
            throw new UsernameNotFoundException("Invalid user request!");
        }

    }    

    @GetMapping("/getUsers")
    public ResponseEntity<List<Users>> getUsers(@CookieValue("token") String cookieValue)
    {
        return ResponseEntity.ok(userRepository.getAllUsers());
    }
}


