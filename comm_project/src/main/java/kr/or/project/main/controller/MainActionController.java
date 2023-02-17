package kr.or.project.main.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import kr.or.project.main.model.NoticeInfo;
import kr.or.project.main.service.MainService;
@Controller 
public class MainActionController {
	
	private static final Logger logger = LoggerFactory.getLogger(MainActionController.class);
	
	@Autowired //interface랑 연결 (상속받은 mainserviceimp 로 연결됨)
	MainService mainService;
	
	@RequestMapping(value = {"/" , "/mainContentView.do"})
	public ModelAndView mainContentView(HttpSession session, Locale locale, Model model) throws Exception{
		
		System.out.println("mainpage call!");
		
		ModelAndView mv = new ModelAndView();
		
		mv.addObject("pageName", "검색어 테스트 페이지 입니다.");
		mv.setViewName( "/main/mainList");
		
		return mv;
	}
	
	@RequestMapping(value = "/main/getMainInfos.do")
	@ResponseBody //비동기로 작동하려면 해당 어노테이션 추가해야됨 (ajax)
	public Map getMainInfos(HttpServletRequest request, Model model, @RequestBody NoticeInfo noticeParam) throws Exception{
		
		Map<String, Object> rMap = new HashMap<String, Object>();
		
		List<NoticeInfo> mainResult = mainService.selectMainInfo(noticeParam);
		
		rMap.put("mainResult", mainResult);
		
		return rMap;
	}
	
	@RequestMapping(value = "/main/delMainInfo.do")
	@ResponseBody
	public Map<String, Object> delMainInfo(HttpServletRequest request, Model model, @RequestBody NoticeInfo noticeInfo) throws Exception {

		Map<String, Object> resultMap = new HashMap<String, Object>();

		return resultMap;
	}
	
	@RequestMapping(value = "/mainList2.do")
	public ModelAndView mainList2(HttpSession session, Locale locale, Model model) throws Exception{
		
		System.out.println("mainpage call!");
		
		ModelAndView mv = new ModelAndView();
		
		mv.addObject("pageName", "검색어 테스트 페이지 입니다.");
		mv.setViewName( "/main/mainList2");
		
		return mv;
		
	}

	@RequestMapping(value = "/mainList3.do")
	public ModelAndView mainList3(HttpSession session, Locale locale, Model model) throws Exception{
		
		System.out.println("mainpage call!");
		
		ModelAndView mv = new ModelAndView();
		
		mv.addObject("pageName", "검색어 테스트 페이지 입니다.");
		mv.setViewName( "/main/mainList3");
		
		return mv;
	}
	
	@RequestMapping(value="/test",method=RequestMethod.POST)
	public String Test(@RequestParam("id") String id,@RequestParam("url")String url,@RequestParam("file") MultipartFile file ,Model model) {
		System.out.println("POSTSPOTSTOPSOTSOPTS!");
		model.addAttribute("data",id);
		System.out.println(id);
		System.out.println(url);
		
		String name=file.getOriginalFilename();
		File f=new File("c:\\upload\\"+name);
		System.out.println(name);
		try {
			file.transferTo(f);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return "redirect:/main/test";
	}
}
