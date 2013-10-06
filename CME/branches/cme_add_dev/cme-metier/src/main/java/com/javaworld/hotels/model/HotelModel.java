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
import java.util.Iterator;

import com.javaworld.hotels.businessobjects.Hotel;
import com.javaworld.hotels.values.Ville;
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
	
	private VilleDao villes = new VilleDao();
    /**
     * Retourne les hôtels dans une ville donnée.
     * @param ville le nom de la ville
     * @return une liste d'objets Hotel
     */
    public List <Hotel> trouveHotelsParVille(Ville ville) {

		List <Hotel> hotelsTrouves = new ArrayList <Hotel>();
		
		Iterator<Hotel> iHotel = hotels.getHotels().iterator();
		
		while(iHotel.hasNext())
		{
			Hotel hotel = (Hotel)iHotel.next();


            if (hotel.getVille().equals(ville) ) {
                hotelsTrouves.add(hotel);
            }
        }
        return hotelsTrouves;
    }

    /**
     * Retourne la liste des villes de la base de données qui ont un hôtel.
     * @return une liste des noms de villes
     */
    public List <String> trouveVillesDisponibles() {
    	
    	List <String> trouveVilles = new ArrayList <String>();
    	
    	for(Ville ville :  villes.getVilles()) {
    		trouveVilles.add(ville.getVille());
    	}
        return trouveVilles;
    }
}
