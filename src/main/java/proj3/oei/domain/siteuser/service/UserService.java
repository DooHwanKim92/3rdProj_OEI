package proj3.oei.domain.siteuser.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj3.oei.domain.siteuser.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

}
