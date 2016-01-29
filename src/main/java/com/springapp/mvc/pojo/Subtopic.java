package com.springapp.mvc.pojo;

import javax.persistence.*;

/**
 * Created by l3eal2 on 17/3/2558.
 */
@Entity
@Table(name = "TDCS_SUBTOPIC")
public class Subtopic {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO, generator="TDCS_SUBTOPIC_SEQ_GEN")
    @SequenceGenerator(name="TDCS_SUBTOPIC_SEQ_GEN", sequenceName="TDCS_SUBTOPIC_SEQ")
    @Column(name = "SUB_ID")
    private Integer subtopicId;

    @Column(name = "TOPIC_ID")
    private Integer topicId;

    @Column(name = "SUB_DATA")
    private String subtopicData;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "TOPIC_ID", insertable = false, updatable = false)
    private Topic topic;

    public Integer getSubtopicId() {
        return subtopicId;
    }

    public void setSubtopicId(Integer subtopicId) {
        this.subtopicId = subtopicId;
    }

    public Integer getTopicId() {
        return topicId;
    }

    public void setTopicId(Integer topicId) {
        this.topicId = topicId;
    }

    public String getSubtopicData() {
        return subtopicData;
    }

    public void setSubtopicData(String subtopicData) {
        this.subtopicData = subtopicData;
    }

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    @Override
    public String toString() {
        return "Subtopic{" +
                "subtopicId=" + subtopicId +
                ", topicId=" + topicId +
                ", topicData='" + subtopicData + '\'' +
                ", topic=" + topic +
                '}';
    }
}
