package com.springapp.mvc.pojo;

import javax.persistence.*;

/**
 * Created by l3eal2 on 17/3/2558.
 */
@Entity
@Table(name = "TDCS_TOPIC")
public class Topic {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO, generator="TDCS_EVA_SEQ_GEN")
    @SequenceGenerator(name="TDCS_EVA_SEQ_GEN", sequenceName="TDCS_EVA_SEQ")
    @Column(name = "TOPIC_ID")
    private Integer topicId;

    @Column(name = "TOPIC_DATA")
    private String topicData;

    @Column(name = "SCORE")
    private Integer score;

    public Integer getTopicId() {
        return topicId;
    }

    public void setTopicId(Integer topicId) {
        this.topicId = topicId;
    }

    public String getTopicData() {
        return topicData;
    }

    public void setTopicData(String topicData) {
        this.topicData = topicData;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    @Override
    public String toString() {
        return "Topic{" +
                "topicId=" + topicId +
                ", topicData='" + topicData + '\'' +
                ", score=" + score +
                '}';
    }
}
