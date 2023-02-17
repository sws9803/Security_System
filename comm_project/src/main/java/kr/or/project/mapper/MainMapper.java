package kr.or.project.mapper;

import java.util.List;

import kr.or.project.annotation.MariaDbMapper;
import kr.or.project.main.model.NoticeInfo;

@MariaDbMapper
public interface MainMapper {
	
	public List<NoticeInfo> selectMainInfo(NoticeInfo noticeInfo) throws Exception;
	
}
