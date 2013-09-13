// //////////////////////////////////////////////////////////////////////////////
// HotelModel: $Source$
//
// Created : 15 nov. 2005 by jfsmart
// Last modified $Date$ by $Author$
// Revision: $Revision$
// Version : $ID$
// //////////////////////////////////////////////////////////////////////////////

package com.javaworld.hotels.model;

import java.util.ArrayList;
import java.util.List;

import com.javaworld.hotels.businessobjects.Hotel;
import com.javaworld.hotels.dao.*;

/**
 * Une classe simple proposant quelques services d'hotels.
 * @author jfsmart
 */
public class HotelModel {

    /**
     * La liste de tous les hotels de la base de données.
     */
    private HotelDao hotels = new HotelDao();
	
	private VillesDao villes = new VillesDao();
    /**
     * Retourne les hôtels dans une ville donnée.
     * @param ville le nom de la ville
     * @return une liste d'objets Hotel
     */
    public List <Hotel> trouveHotelsParVille(String ville) {
        List <Hotel> hotelsTrouves = new ArrayList <Hotel>();
        for (Hotel hotel : hotels.getHotels()) {
            if (hotel.getVille().equalsIgnoreCase(ville)) {
                hotelsTrouves.add(hotel);
            }
        }
        return hotelsTrouves;
    }

    /**
     * Retourne la liste des villes de la base de données qui ont un hôtel.
     * @return une liste des noms de villes
     */
    public String[] trouveVillesDiponibles() {
        return villes.getVilles();
    }
}
