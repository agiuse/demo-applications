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
public class VillesDao {

    /**
     * La liste de toutes les villes connues dans la base de données.
     */
    private static String[] villes = { "Paris", "Londres" };

	public VillesDao() {
		super();
	};
	
	public String[] getVilles() {
		return villes;
	};
}