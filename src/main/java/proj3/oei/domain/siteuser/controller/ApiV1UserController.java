package proj3.oei.domain.siteuser.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import proj3.oei.domain.siteuser.service.UserService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/articles")
public class ApiV1UserController {

    private final UserService userService;






}
