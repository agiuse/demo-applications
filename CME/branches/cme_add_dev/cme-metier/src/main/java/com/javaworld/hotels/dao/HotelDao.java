package com.javaworld.hotels.dao;

import com.javaworld.hotels.businessobjects.Hotel;
import com.javaworld.hotels.values.Ville;

import java.util.ArrayList;
import java.util.List;

public class HotelDao {

    private static List<Hotel> hotels = new ArrayList <Hotel>();;

	public HotelDao() {
		 super();
         hotels.add (new Hotel("Hotel Latin", "Quartier latin", Ville.PARIS, 3));
         hotels.add (new Hotel("Hotel Etoile", "Place de l'Etoile", Ville.PARIS, 4));
         hotels.add ( new Hotel("Hotel Vendome", "Place Vendome", Ville.PARIS, 5));
         hotels.add (new Hotel("Hotel Hilton", "Trafalgar Square", Ville.LONDRES, 4));
         hotels.add (new Hotel("Hotel Ibis", "The City", Ville.LONDRES, 3));
		};
		 
	public List<Hotel> getHotels() {
		 	return hotels;
	};

}