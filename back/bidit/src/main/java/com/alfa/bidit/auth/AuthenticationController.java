package com.alfa.bidit.auth;

import com.alfa.bidit.exception.UserAlreadyExistsException;
import com.alfa.bidit.exception.UserAlreadyExistsRegistrationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.Date;

@CrossOrigin
@RestController
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtTokenUtil;
    @Autowired
    private BiditUserDetailsService userDetailsService;

    @RequestMapping(value = "/api/v1/authenticationTest", method = RequestMethod.GET)
    public String hello(@RequestHeader("Authorization") String token){

        String name = jwtTokenUtil.extractUsername(token.substring(7));

        return "Hello " + name ;
    }

    @RequestMapping(value = "/api/v1/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {


        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String jwt = jwtTokenUtil.generateToken(userDetails);
        Date now = Date.from(Instant.now());
        System.out.println("[INFO] " + now + " USER IS AUTHENTICATED");
        return ResponseEntity.ok(new JwtResponse(jwt));
    }

    @RequestMapping(value = "/api/v1/register", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(@RequestBody UserCredentialsDto user) throws Exception {
        UserCredentials userCredentials = userDetailsService.save(user);
        if(userCredentials == null){
            Exception userAlreadyExistsRegistrationException = new UserAlreadyExistsRegistrationException(user.getUsername());
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE,
                                              userAlreadyExistsRegistrationException.getMessage(),
                                              userAlreadyExistsRegistrationException);
        }
        Date now = Date.from(Instant.now());
        System.out.println("[INFO] " + now + " USER CREDENTIALS ARE REGISTERED");
        return ResponseEntity.ok(userCredentials);
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("SORRY, USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("SORRY,INVALID_CREDENTIALS", e);
        }
    }

}
