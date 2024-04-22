package proj3.oei.domain.message.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import proj3.oei.domain.message.entity.Message;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class MessageDto {

    private String type;

    private String senderName;

    private String title;

    private String content;

    private String receiverName;

    private String senderProfileImg;

    private String receiverProfileImg;

    private LocalDateTime createDate;

    private LocalDateTime modifiedDate;


    public MessageDto(Message message) {

        this.title = message.getTitle();
        this.content = message.getContent();
        this.createDate = message.getCreateDate();
        this.modifiedDate = message.getModifiedDate();

        if(message.getType().equals("send")) {
            this.senderName = message.getMember().getNickname();
            this.receiverName = message.getOther().getNickname();
            this.senderProfileImg = message.getMember().getProfileImg();
            this.receiverProfileImg = message.getOther().getProfileImg();
            this.type = message.getType();
        } else if (message.getType().equals("receive")) {
            this.senderName = message.getOther().getNickname();
            this.receiverName = message.getMember().getNickname();
            this.senderProfileImg = message.getOther().getProfileImg();
            this.receiverProfileImg = message.getMember().getProfileImg();
            this.type = message.getType();
        }


    }
}
