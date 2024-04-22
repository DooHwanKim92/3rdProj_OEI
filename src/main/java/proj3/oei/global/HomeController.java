package proj3.oei.global;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import proj3.oei.global.rq.Rq;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class HomeController {

    private final Rq rq;

    @AllArgsConstructor
    @Getter
    public static class IsLoggedInResponse {
        private boolean trueOrFalse;
    }
}
