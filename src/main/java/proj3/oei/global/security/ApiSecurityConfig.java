package proj3.oei.global.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import proj3.oei.global.security.filter.JwtAuthorizationFilter;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class ApiSecurityConfig {
    private final JwtAuthorizationFilter jwtAuthorizationFilter;
    @Bean
    SecurityFilterChain apiFilterChain(HttpSecurity http) throws Exception {
        http
                .securityMatcher("/api/**")
                .authorizeRequests(
                        authorizeRequests -> authorizeRequests
                                .requestMatchers("/api/*/articles").permitAll()
                                .requestMatchers("/api/*/questions").permitAll()
                                .requestMatchers("/api/*/questions/**").permitAll()
                                // .requestMatchers(HttpMethod.GET,"/api/*/articles").permitAll()
                                .requestMatchers("/api/*/articles/**").permitAll()
                                // .requestMatchers(HttpMethod.POST,"/api/*/members/login").permitAll()
                                .requestMatchers("/api/*/members/**").permitAll()
                                .requestMatchers("/api/*/reviews/**").permitAll()
                                .requestMatchers("/api/*/messages").permitAll()
                                .requestMatchers("/api/*/messages/**").permitAll()
                                .requestMatchers("/api/*").permitAll()
                                .anyRequest().authenticated()
                )
                .cors(
                        cors -> cors.disable()
                        // cors 설정, 타 도메인에서 api 호출 가능
                )
                .csrf(
                        csrf -> csrf.disable()
                        // csrf 토큰 끄기
                )
                .httpBasic(
                        httpBasic -> httpBasic.disable()
                        // httpBasic 로그인 방식 끄기
                )
                .formLogin(
                        formLogin -> formLogin.disable()
                        // 폼 로그인 방식 끄기
                )
                .sessionManagement(
                        sessionManagement -> sessionManagement.sessionCreationPolicy(STATELESS)
                        // 세션 끄기
                )
                .addFilterBefore(
                        jwtAuthorizationFilter, //엑세스 토큰을 이용한 로그인 처리
                        UsernamePasswordAuthenticationFilter.class
                )
        ;
        return http.build();
    }
}