package kr.or.project.main.model;

import java.util.List;

public class NoticeInfo{
	
	/** 공지ID */
	private String noticeId;
	/** 공지구분 */
	private String noticeSe;
	/** 공지제목 */
	private String noticeSj;
	/** 공지내용 */
	private String noticeCn;
	/** 첨부파일 */
	private String atchmnfl;
	/** 첨부파일명 */
	//private AtchmnflInfo atchmnflFile;
	/** 조회수 */
	private String rdcnt;
	/** 담당자명 */
	private String chargerNm;

	public String getChargerNm() {
		return chargerNm;
	}

	public void setChargerNm(String chargerNm) {
		this.chargerNm = chargerNm;
	}

	public String getNoticeId() {
		return noticeId;
	}

	public void setNoticeId(String noticeId) {
		this.noticeId = noticeId;
	}

	public String getNoticeSe() {
		return noticeSe;
	}

	public void setNoticeSe(String noticeSe) {
		this.noticeSe = noticeSe;
	}

	public String getNoticeSj() {
		return noticeSj;
	}

	public void setNoticeSj(String noticeSj) {
		this.noticeSj = noticeSj;
	}

	public String getNoticeCn() {
		return noticeCn;
	}

	public void setNoticeCn(String noticeCn) {
		this.noticeCn = noticeCn;
	}

	public String getAtchmnfl() {
		return atchmnfl;
	}

	public void setAtchmnfl(String atchmnfl) {
		this.atchmnfl = atchmnfl;
	}

	public String getRdcnt() {
		return rdcnt;
	}

	public void setRdcnt(String rdcnt) {
		this.rdcnt = rdcnt;
	}


}
