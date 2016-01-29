package com.springapp.mvc.pojo;

import javax.persistence.*;

/**
 * Created by Pongpipat on 6/2/2558.
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "TDCS_USER")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "TDCS_USER_ID_SEQ_GEN")
    @SequenceGenerator(name = "TDCS_USER_ID_SEQ_GEN", sequenceName = "TDCS_USER_ID_SEQ")
    @Column(name = "USER_ID")
    private Integer userId;

    @Column(name = "USERNAME")
    private String userName;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "EMP_ID")
    private String empId;

    @Column(name = "TH_FNAME")
    private String thFname;

    @Column(name = "TH_LNAME")
    private String thLname;

    @Column(name = "EN_FNAME")
    private String enFname;

    @Column(name = "EN_LNAME")
    private String enLname;

    @Column(name = "NICKNAME")
    private String nickName;

    @Column(name = "GRADE")
    private Double grade;

    @Column(name = "LEVELSTU")
    private Integer levelStu;

    @Column(name = "BIRTHDATE")
    private String birthDate;

    @Column(name = "TEL1")
    private String tell1;

    @Column(name = "TEL2")
    private String tell2;

    @Column(name = "EMAIL1")
    private String eMail1;

    @Column(name = "EMAIL2")
    private String eMail2;

    @Column(name = "ADDRESS")
    private String address;

    @Column(name = "SKYPE")
    private String skype;

    @Column(name = "STATUS")
    private Integer status;

    @Column(name = "IMANGE")
    private String imange;

    @Column(name = "START_WORK")
    private String startWork;

    @Column(name = "END_WORK")
    private String endWork;

    @Column(name = "STAFF_ID")
    private Integer staffId;

    @Column(name = "TEAM_ID")
    private Integer teamId;

    @Column(name = "VALIDATESTU")
    private Integer validateStu;

    @Column(name = "EVA_GRADE")
    private String evaGrade;

    @Column(name = "PIORITY")
    private String piority;

    @Column(name = "COMP_ID")
    private Integer compId;

    @Column(name = "SP_ID")
    private Integer spId;

    @Column(name = "UNI_FAC_MAJ_ID")
    private Integer uniFacMajId;

    @Column(name = "USER_CREATE")
    private String userCreate;

    @Column(name = "DATE_CREATE")
    private String dateCreate;

    @Column(name = "USER_UPDATE")
    private String userUpdate;

    @Column(name = "DATE_UPDATE")
    private String dateUpdate;

    @Column(name = "APT_ID")
    private Integer aptId;

    @Column(name = "SECTION_ID")
    private Integer sectionId;

    @Column(name = "POSI_ID")
    private Integer posiId;

    @Column(name = "VIEW_EVA")
    private Integer viewEav;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "SECTION_ID", insertable = false, updatable = false)
    private Section section;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "APT_ID", insertable = false, updatable = false)
    private Apprentice apprentice;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "POSI_ID", insertable = false, updatable = false)
    private Position position;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "UNI_FAC_MAJ_ID", insertable = false, updatable = false)
    private UniversityFacultyMajor universityFacultyMajor;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "SP_ID", insertable = false, updatable = false)
    private SectionPosition sectionPosition;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "COMP_ID", insertable = false, updatable = false)
    private Company company;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "TEAM_ID", insertable = false, updatable = false)
    private Team team;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public String getThFname() {
        return thFname;
    }

    public void setThFname(String thFname) {
        this.thFname = thFname;
    }

    public String getThLname() {
        return thLname;
    }

    public void setThLname(String thLname) {
        this.thLname = thLname;
    }

    public String getEnFname() {
        return enFname;
    }

    public void setEnFname(String enFname) {
        this.enFname = enFname;
    }

    public String getEnLname() {
        return enLname;
    }

    public void setEnLname(String enLname) {
        this.enLname = enLname;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public Double getGrade() {
        return grade;
    }

    public void setGrade(Double grade) {
        this.grade = grade;
    }

    public Integer getLevelStu() {
        return levelStu;
    }

    public void setLevelStu(Integer levelStu) {
        this.levelStu = levelStu;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getTell1() {
        return tell1;
    }

    public void setTell1(String tell1) {
        this.tell1 = tell1;
    }

    public String getTell2() {
        return tell2;
    }

    public void setTell2(String tell2) {
        this.tell2 = tell2;
    }

    public String geteMail1() {
        return eMail1;
    }

    public void seteMail1(String eMail1) {
        this.eMail1 = eMail1;
    }

    public String geteMail2() {
        return eMail2;
    }

    public void seteMail2(String eMail2) {
        this.eMail2 = eMail2;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getSkype() {
        return skype;
    }

    public void setSkype(String skype) {
        this.skype = skype;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getImange() {
        return imange;
    }

    public void setImange(String imange) {
        this.imange = imange;
    }

    public String getStartWork() {
        return startWork;
    }

    public void setStartWork(String startWork) {
        this.startWork = startWork;
    }

    public String getEndWork() {
        return endWork;
    }

    public void setEndWork(String endWork) {
        this.endWork = endWork;
    }

    public Integer getStaffId() {
        return staffId;
    }

    public void setStaffId(Integer staffId) {
        this.staffId = staffId;
    }

    public Integer getTeamId() {
        return teamId;
    }

    public void setTeamId(Integer teamId) {
        this.teamId = teamId;
    }

    public Integer getValidateStu() {
        return validateStu;
    }

    public void setValidateStu(Integer validateStu) {
        this.validateStu = validateStu;
    }

    public String getEvaGrade() {
        return evaGrade;
    }

    public void setEvaGrade(String evaGrade) {
        this.evaGrade = evaGrade;
    }

    public String getPiority() {
        return piority;
    }

    public void setPiority(String piority) {
        this.piority = piority;
    }

    public Integer getCompId() {
        return compId;
    }

    public void setCompId(Integer compId) {
        this.compId = compId;
    }

    public Integer getSpId() {
        return spId;
    }

    public void setSpId(Integer spId) {
        this.spId = spId;
    }

    public Integer getUniFacMajId() {
        return uniFacMajId;
    }

    public void setUniFacMajId(Integer uniFacMajId) {
        this.uniFacMajId = uniFacMajId;
    }

    public String getUserCreate() {
        return userCreate;
    }

    public void setUserCreate(String userCreate) {
        this.userCreate = userCreate;
    }

    public String getDateCreate() {
        return dateCreate;
    }

    public void setDateCreate(String dateCreate) {
        this.dateCreate = dateCreate;
    }

    public String getUserUpdate() {
        return userUpdate;
    }

    public void setUserUpdate(String userUpdate) {
        this.userUpdate = userUpdate;
    }

    public String getDateUpdate() {
        return dateUpdate;
    }

    public void setDateUpdate(String dateUpdate) {
        this.dateUpdate = dateUpdate;
    }

    public Integer getAptId() {
        return aptId;
    }

    public void setAptId(Integer aptId) {
        this.aptId = aptId;
    }

    public Integer getSectionId() {
        return sectionId;
    }

    public void setSectionId(Integer sectionId) {
        this.sectionId = sectionId;
    }

    public Integer getPosiId() {
        return posiId;
    }

    public void setPosiId(Integer posiId) {
        this.posiId = posiId;
    }

    public Integer getViewEav() {
        return viewEav;
    }

    public void setViewEav(Integer viewEav) {
        this.viewEav = viewEav;
    }

    public Section getSection() {
        return section;
    }

    public void setSection(Section section) {
        this.section = section;
    }

    public Apprentice getApprentice() {
        return apprentice;
    }

    public void setApprentice(Apprentice apprentice) {
        this.apprentice = apprentice;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public UniversityFacultyMajor getUniversityFacultyMajor() {
        return universityFacultyMajor;
    }

    public void setUniversityFacultyMajor(UniversityFacultyMajor universityFacultyMajor) {
        this.universityFacultyMajor = universityFacultyMajor;
    }

    public SectionPosition getSectionPosition() {
        return sectionPosition;
    }

    public void setSectionPosition(SectionPosition sectionPosition) {
        this.sectionPosition = sectionPosition;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", empId='" + empId + '\'' +
                ", thFname='" + thFname + '\'' +
                ", thLname='" + thLname + '\'' +
                ", enFname='" + enFname + '\'' +
                ", enLname='" + enLname + '\'' +
                ", nickName='" + nickName + '\'' +
                ", grade=" + grade +
                ", levelStu=" + levelStu +
                ", birthDate='" + birthDate + '\'' +
                ", tell1='" + tell1 + '\'' +
                ", tell2='" + tell2 + '\'' +
                ", eMail1='" + eMail1 + '\'' +
                ", eMail2='" + eMail2 + '\'' +
                ", address='" + address + '\'' +
                ", skype='" + skype + '\'' +
                ", status=" + status +
                ", imange='" + imange + '\'' +
                ", startWork='" + startWork + '\'' +
                ", endWork='" + endWork + '\'' +
                ", staffId=" + staffId +
                ", teamId=" + teamId +
                ", validateStu=" + validateStu +
                ", evaGrade='" + evaGrade + '\'' +
                ", piority='" + piority + '\'' +
                ", compId=" + compId +
                ", spId=" + spId +
                ", uniFacMajId=" + uniFacMajId +
                ", userCreate='" + userCreate + '\'' +
                ", dateCreate='" + dateCreate + '\'' +
                ", userUpdate='" + userUpdate + '\'' +
                ", dateUpdate='" + dateUpdate + '\'' +
                ", aptId=" + aptId +
                ", sectionId=" + sectionId +
                ", posiId=" + posiId +
                ", viewEav=" + viewEav +
                ", section=" + section +
                ", apprentice=" + apprentice +
                ", position=" + position +
                ", universityFacultyMajor=" + universityFacultyMajor +
                ", sectionPosition=" + sectionPosition +
                ", company=" + company +
                ", team=" + team +
                '}';
    }
}