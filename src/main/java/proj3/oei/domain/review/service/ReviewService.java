package proj3.oei.domain.review.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj3.oei.domain.article.entity.Article;
import proj3.oei.domain.member.entity.Member;
import proj3.oei.domain.review.entity.Review;
import proj3.oei.domain.review.repository.ReviewRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public void create(String content, Member member, Article article) {
        Review review = Review.builder()
                .content(content)
                .author(member)
                .article(article)
                .build();

        this.reviewRepository.save(review);
    }

    public List<Review> findAll() {
        return this.reviewRepository.findAll();
    }
}
