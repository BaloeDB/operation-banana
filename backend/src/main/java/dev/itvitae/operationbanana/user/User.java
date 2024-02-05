package dev.itvitae.operationbanana.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "`users`")
public class User implements UserDetails {
    @Id
    @GeneratedValue
    private long id;
    @Column(length = 20)
    private String username;
    private String password;
    @JsonIgnore
    @Enumerated(EnumType.STRING)
    private Role[] roles;

    public User(String username, String password, Role... roles) {
        this.username = username;
        this.password = password;
        this.roles = roles;
    }

    public void setRoles(Role... roles) {
        this.roles = roles;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.stream(roles).map(Role::toAuthority).toList();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public boolean validateDetails() {
        return username.length() <= 20 && username.matches("\\w+") && password.length() > 7;
    }

    public enum Role {
        ROLE_USER,
        ROLE_ADMIN;
        public GrantedAuthority toAuthority() {
            return new SimpleGrantedAuthority(toString());
        }
    }
}
