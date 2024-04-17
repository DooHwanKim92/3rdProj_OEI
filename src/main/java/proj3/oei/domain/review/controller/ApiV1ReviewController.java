package proj3.oei.domain.review.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import proj3.oei.domain.article.entity.Article;
import proj3.oei.domain.article.service.ArticleService;
import proj3.oei.domain.member.entity.Member;
import proj3.oei.domain.review.entity.Review;
import proj3.oei.domain.review.service.ReviewService;
import proj3.oei.global.rq.Rq;

import java.util.List;
import java.util.Optional;

@RestController
// 콘트롤러 메서드에서 return하는 값을 기본적으로 문자열로 반환함
// like @ResponseBody
@RequiredArgsConstructor
@RequestMapping("/api/v1/reviews")
public class ApiV1ReviewController {

    private final ReviewService reviewService;

    private final ArticleService articleService;

    private final Rq rq;

    @Data
    public static class CreateRequest {

        @NotBlank
        private String content;

    }

    @GetMapping("")
    public void getReviews() {
        List<Review> reviews = this.reviewService.findAll();
    }

    @PostMapping("/{id}")
    public void createReview(@Valid @RequestBody CreateRequest createRequest, @PathVariable(value = "id") Long id) {

        Member member = rq.getMember();

        Optional<Article> article = this.articleService.findById(id);
        if(article.isEmpty()) {
            article = null;
        } else {
            this.reviewService.create(createRequest.getContent(), member, article.get());
        }


    }


}
