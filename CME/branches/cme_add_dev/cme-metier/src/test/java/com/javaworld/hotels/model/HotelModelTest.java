////////////////////////////////////////////////////////////////////////////////
// HotelModelTest: $Source$
//
// Created : 15 nov. 2005 by jfsmart
// Last modified $Date$ by $Author$
// Revision: $Revision$
// Version : $ID$
// Copyright (c) 2005
////////////////////////////////////////////////////////////////////////////////

package com.javaworld.hotels.model;

import java.util.Iterator;
import java.util.List;

import com.javaworld.hotels.businessobjects.Hotel;
import com.javaworld.hotels.values.Ville;

import org.junit.Assert;
import org.junit.Test;
import java.net.URL;

public class HotelModelTest {

	@Test
	public void testTrouveHotelsParVille1() {
		
		URL  hotelsXml = ClassLoader.getSystemResource("hotels.xml");

		HotelModel finder = new HotelModel(hotelsXml);
		List<Hotel> hotels = finder.trouveHotelsParVille(Ville.PARIS);
		Assert.assertTrue(hotels.size() > 0);
		
		
		Iterator<Hotel> iHotel = hotels.iterator();
		while(iHotel.hasNext())
		{
			Hotel h = (Hotel)iHotel.next();
			Assert.assertEquals(h.getVille(),Ville.PARIS);
		}
	}

	@Test
	public void testTrouveHotelsParVille2() {

		URL hotelsXml = ClassLoader.getSystemResource("hotels.xml");


		HotelModel finder = new HotelModel(hotelsXml);
		List<Hotel> hotels = finder.trouveHotelsParVille(Ville.LONDRES);
		Assert.assertTrue(hotels.size() > 0);

		Iterator<Hotel> iHotel = hotels.iterator();
		while(iHotel.hasNext())
		{
			Hotel h = (Hotel)iHotel.next();
			Assert.assertEquals(h.getVille(),Ville.LONDRES);
		}
	}


	@Test
	public void testTrouveVillesDiponibles() {

		URL hotelsXml = ClassLoader.getSystemResource("hotels.xml");

		HotelModel trouveur = new HotelModel(hotelsXml);
		List<String> villes = trouveur.trouveVillesDisponibles();
		Assert.assertEquals(villes.size(), 2);
	}

}
