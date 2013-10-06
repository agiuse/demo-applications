// //////////////////////////////////////////////////////////////////////////////
// HotelDAO: $Source$
//
// Created : Sept 11 2013 by eagius
// Last modified $Date$ by $Author$
// Revision: $Revision$
// Version : $ID$
// //////////////////////////////////////////////////////////////////////////////

package com.javaworld.hotels.dao;

import com.javaworld.hotels.values.Ville;

/**
 * Une classe simple proposant quelques services pour la base de données
 * d'hotels
 * @author eagius
 */
public class VilleDao {

    /**
     * La liste de toutes les villes connues dans la base de données.
     */
    private static Ville[] villes = { Ville.PARIS, Ville.LONDRES };

	public VilleDao() {
		super();
	}
	
	public Ville[] getVilles() {
		return villes;
	}
}