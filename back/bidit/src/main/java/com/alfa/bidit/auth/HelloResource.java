package com.alfa.bidit.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class HelloResource {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtTokenUtil;
    @Autowired
    private BiditUserDetailsService userDetailsService;

    @RequestMapping(value = "/api/v1/hello", method = RequestMethod.GET)
    public String hello(@RequestHeader("Authorization") String token){

        String name = jwtTokenUtil.extractUsername(token.substring(7));

        return "Hello world" + name ;
    }

    @RequestMapping(value = "/api/v1/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {


        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String jwt = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(jwt));
    }

    @RequestMapping(value = "/api/v1/register", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(@RequestBody UserDto user) throws Exception {
        UserDao userDao = userDetailsService.save(user);
        if(userDao == null){
            System.out.println("inside if");
            return (ResponseEntity<?>) ResponseEntity.notFound();
        }
        return ResponseEntity.ok(userDao);
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("izin mi bilmiyom, USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("sifre yanlis,INVALID_CREDENTIALS", e);
        }
    }

}
