package kr.or.project.main.service;

import java.util.List;

import kr.or.project.main.model.NoticeInfo;

public interface MainService {
	
	public List<NoticeInfo> selectMainInfo(NoticeInfo noticeInfo);
	
}
