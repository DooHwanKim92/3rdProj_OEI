package proj3.oei.domain.question.controller;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import proj3.oei.domain.member.entity.Member;
import proj3.oei.domain.question.entity.Question;
import proj3.oei.domain.question.service.QuestionService;
import proj3.oei.global.resultData.RsData;
import proj3.oei.global.rq.Rq;

import java.util.List;

@RestController
@RequestMapping("/api/v1/questions")
@RequiredArgsConstructor
public class ApiV1QuestionController {
    private final QuestionService questionService;

    private final Rq rq;

    @Getter
    @AllArgsConstructor
    public static class QuestionsResponse {
        private final List<Question> questions;
    }

    @GetMapping("")
    public RsData<QuestionsResponse> getQuestions() {
        Member member = rq.getMember();

        List<Question> questions = this.questionService.getMyQList(member);

        return RsData.of("S-1", "성공", new QuestionsResponse((questions)));
    }

    @Data
    public static class CreateRequest {
        @NotBlank
        private String title;
        @NotBlank
        private String content;
    }

    @Getter
    @AllArgsConstructor
    public static class CreateResponse {
        private final Question question;
    }

    @PostMapping("")
    public void createQuestion(@Valid @RequestBody CreateRequest createRequest) {
        Member member = rq.getMember();

        this.questionService.create(member, createRequest.getTitle(), createRequest.getContent());


    }
}
