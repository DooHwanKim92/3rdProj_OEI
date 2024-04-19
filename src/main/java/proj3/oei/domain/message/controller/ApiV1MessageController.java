package proj3.oei.domain.message.controller;


import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import proj3.oei.domain.member.entity.Member;
import proj3.oei.domain.member.service.MemberService;
import proj3.oei.domain.message.entity.Message;
import proj3.oei.domain.message.service.MessageService;
import proj3.oei.global.resultData.RsData;
import proj3.oei.global.rq.Rq;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/messages")
@RequiredArgsConstructor
public class ApiV1MessageController {

    private final MessageService messageService;

    private final MemberService memberService;

    private final Rq rq;

    @Getter
    @AllArgsConstructor
    public static class MessagesResponse {
        private final List<Message> messages;
    }

    @GetMapping("")
    public RsData<MessagesResponse> getMessages() {

        Member member = rq.getMember();

        List<Message> messages = this.messageService.getMyMessages(member);

        return RsData.of(
                "S-1",
                "성공",
                new MessagesResponse(messages)
        );

    }

    @Data
    public static class CreateRequest {
        @NotBlank
        private String title;
        @NotBlank
        private String content;

        private String id;
    }

    @Getter
    @AllArgsConstructor
    public static class CreateResponse {
        private final Message message;
    }

    @PostMapping("")
    public void sendMessage(@Valid @RequestBody CreateRequest createRequest) {

        Member member = rq.getMember();
        Optional<Member> otherMember = this.memberService.findById(Long.valueOf(createRequest.getId()));
        if (otherMember.isEmpty()) {
            otherMember = null;
        }

        this.messageService.send(member, createRequest.getTitle(), createRequest.getContent(), otherMember.get());
        // 보내는 사람, 제목, 내용, 받는 사람

    }

}
