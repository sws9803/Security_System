package Controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

public class TestController {
	@RequestMapping(value="/test.do")
	public String testd(Model model) {
		//model.addAttribute("data",id);
		return "test";
	}
}
