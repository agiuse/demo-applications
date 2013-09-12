// //////////////////////////////////////////////////////////////////////////////
// HotelDAO: $Source$
//
// Created : Sept 11 2013 by eagius
// Last modified $Date$ by $Author$
// Revision: $Revision$
// Version : $ID$
// //////////////////////////////////////////////////////////////////////////////

package com.javaworld.hotels.dao;

import com.javaworld.hotels.businessobjects.Hotel;

/**
 * Une classe simple proposant quelques services pour la base de données
 * d'hotels
 * @author eagius
 */
public class HotelDao {

    /**
     * La liste de toutes les villes connues dans la base de données.
     */
    private static String[] villes = { "Paris", "Londres" };

    /**
     * La liste de tous les hotels de la base de données.
     */
    private static Hotel[] hotels = {
            new Hotel("Hotel Latin", "Quartier latin", "Paris", 3),
            new Hotel("Hotel Etoile", "Place de l'Etoile", "Paris", 4),
            new Hotel("Hotel Vendome", "Place Vendome", "Paris", 5),
            new Hotel("Hotel Hilton", "Trafalgar Square", "Londres", 4),
            new Hotel("Hotel Ibis", "The City", "Londres", 3), };

	public HotelDao() {
		super();
	};
	
	public Hotel[] getHotels() {
		return hotels;
	};
	
	public String[] getVilles() {
		return villes;
	};
}