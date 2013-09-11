// //////////////////////////////////////////////////////////////////////////////
// HotelDAO: $Source$
//
// Created : Sept 11 2013 by eagius
// Last modified $Date$ by $Author$
// Revision: $Revision$
// Version : $ID$
// Copyright (c) 2013
// //////////////////////////////////////////////////////////////////////////////

package com.javaworld.hotels.dao;

import com.javaworld.hotels.businessobjects.Hotel;

import java.io.*;
import org.jdom2.*;
import org.jdom2.input.*;
import org.jdom2.filter.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Iterator;

/**
 * Une classe simple proposant quelques services pour la base de données
 * d'hotels gérés dans des fichiers xml
 * @author eagius
 */
public class HotelDao {

   static org.jdom2.Document document;
   static Element racine;

   public static void HotelDao(String xml_file)
   {		
		//On crée une instance de SAXBuilder
		SAXBuilder sxb = new SAXBuilder();
		try
		{
			//On crée un nouveau document JDOM avec en argument le fichier XML
			//Le parsing est terminé ;)
			document = sxb.build(new File(xml_file));
		}
		catch(Exception e){}

		//On initialise un nouvel élément racine avec l'élément racine du document.
		racine = document.getRootElement();

   }
}