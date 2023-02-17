package com.senkorea.util;

import java.io.StringReader;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

public class XmlDocument {

	private Document document = null;
	private XPathFactory xFactory = XPathFactory.newInstance();
	private XPath xPath = xFactory.newXPath();

	public XmlDocument() {
		// TODO Auto-generated constructor stub
	}

	public void loadXml(String xml) {
		InputSource is = new InputSource(new StringReader(xml));
		try {
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			factory.setNamespaceAware(true);

			DocumentBuilder builder = factory.newDocumentBuilder();
			document = builder.parse(is);
		} catch (Exception e) {
			document = null;
			e.printStackTrace();
		}
	}

	public NodeList selectNodes(String xpath) {
		try {
			XPathExpression xExpression = xPath.compile(xpath);

			if (document != null) {
				return (NodeList) xExpression.evaluate(document, XPathConstants.NODESET);
			} else {
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public Node selectSingleNode(String xpath) {
		try {
			XPathExpression xExpression = xPath.compile(xpath);

			if (document != null) {
				return (Node) xExpression.evaluate(document, XPathConstants.NODE);
			} else {
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public Node selectSingleNode(Node node, String xpath) {
		try {
			XPathExpression xExpression = xPath.compile(xpath);

			if (node != null) {
				return (Node) xExpression.evaluate(node, XPathConstants.NODE);
			} else {
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
