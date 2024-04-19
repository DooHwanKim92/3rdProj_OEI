package proj3.oei.domain.message.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj3.oei.domain.member.entity.Member;
import proj3.oei.domain.message.entity.Message;
import proj3.oei.domain.message.repository.MessageRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    public void send(Member member, String title, String content, Member other) {
        // 보낸 쪽지 현재 멤버에 저장
        Message sendMessage = Message.builder()
                .type("send")
                .title(title)
                .content(content)
                .member(member)
                .build();

        // 받은 쪽지 상대 멤버에 저장
        Message receiveMessage = Message.builder()
                .type("receive")
                .title(title)
                .content(content)
                .member(other)
                .build();

        this.messageRepository.save(sendMessage);
        this.messageRepository.save(receiveMessage);
    }

    public List<Message> getMyMessages(Member member) {
        return this.messageRepository.getMyMessages(member.getId());
    }
}
