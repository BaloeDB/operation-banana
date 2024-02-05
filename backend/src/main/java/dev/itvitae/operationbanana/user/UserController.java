package dev.itvitae.operationbanana.user;

import dev.itvitae.operationbanana.security.JsonTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/banana/user")
public class UserController {
    private final UserRepo userRepo;
    private final AuthenticationManager authenticationManager;
    private final JsonTokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;

    @PostMapping(value = "/login", produces = MediaType.TEXT_PLAIN_VALUE)
    public String login(@RequestBody User request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
            User user = (User) authentication.getPrincipal();
            return tokenProvider.generateAccessToken(user);
        } catch (Exception exception) {
            return null;
        }
    }

    @PostMapping(value = "/register", produces = MediaType.TEXT_PLAIN_VALUE)
    public String register(@RequestBody User user) {
        if (userRepo.getByUsername(user.getUsername()).isEmpty() && user.validateDetails()) {
            String password = user.getPassword();
            user.setPassword(passwordEncoder.encode(password));
            user.setRoles(User.Role.ROLE_USER);
            userRepo.save(user);
            return tokenProvider.generateAccessToken(user);
        }
        return "";
    }
}
