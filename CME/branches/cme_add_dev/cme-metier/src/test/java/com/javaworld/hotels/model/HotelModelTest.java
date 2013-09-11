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

import java.util.List;

import com.javaworld.hotels.businessobjects.Hotel;

import org.junit.Assert;
import org.junit.Test;

public class HotelModelTest {

	@Test
	public void testTrouveHotelsParVille1() {
		HotelModel finder = new HotelModel();
		List<Hotel> hotels = finder.trouveHotelsParVille("Paris");
		Assert.assertTrue(hotels.size() > 0);
		for(Hotel h : hotels) {
			Assert.assertEquals(h.getVille(),"Paris");
		}
	}

	@Test
	public void testTrouveHotelsParVille2() {
		HotelModel finder = new HotelModel();
		List<Hotel> hotels = finder.trouveHotelsParVille("Londres");
		Assert.assertTrue(hotels.size() > 0);
		for(Hotel h : hotels) {
			Assert.assertEquals(h.getVille(),"Londres");
		}
	}

	@Test
	public void testTrouveHotelsParVilleVide() {
		HotelModel finder = new HotelModel();
		List<Hotel> hotels = finder.trouveHotelsParVille("");
		Assert.assertTrue(hotels.size() == 0);
	}

	@Test
	public void testTrouveHotelsParVilleNull() {
		HotelModel finder = new HotelModel();
		List<Hotel> hotels = finder.trouveHotelsParVille(null);
		Assert.assertTrue(hotels.size() == 0);
	}
	
	@Test
	public void testTrouveVillesDiponibles() {
		HotelModel trouveur = new HotelModel();
		String[] villes = trouveur.trouveVillesDiponibles();
		Assert.assertEquals(villes.length, 2);
	}

}
