package com.cn.yn.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/home")
public class HomeController {
	
	@RequestMapping("/redirect2Index")
	public String redirect2Index() {
		return "home/index";
	}
	
}
