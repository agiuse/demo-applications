package com.javaworld.hotels.dao;

import com.javaworld.hotels.businessobjects.Hotel;

import java.io.IOException;
import java.net.URL;
import org.jdom2.*;
import org.jdom2.input.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Iterator;

public class HotelDao {

    private List<Hotel> hotels = new ArrayList <Hotel>();
	private org.jdom2.Document document;
	private Element racine;

	public HotelDao(URL hotelResource) {
		 super();
		 core(hotelResource);
		 loadHotels();
	};

	
	private void core(URL hotelResource) {
		//On crée une instance de SAXBuilder
		SAXBuilder sxb = new SAXBuilder();
		
		//On crée un nouveau document JDOM avec en argument le fichier XML
		//Le parsing est terminé ;)
		try {
			document = sxb.build(hotelResource);
		} catch (JDOMException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		//On initialise un nouvel élément racine avec l'élément racine du document.
		racine = document.getRootElement();
		
	};

    /**
     * Construit la liste des hotels à partir du DOM Hotel
     */
    private void loadHotels()
	{
		//On crée une List contenant tous les noeuds "hotel" de l'Element racine
		List<Element> listHotelXml = racine.getChildren("hotel");

		//On crée un Iterator sur notre liste
		Iterator<Element> i = listHotelXml.iterator();
		
		while(i.hasNext())
		{
			//On recrée l'Element courant à chaque tour de boucle afin de
			//pouvoir utiliser les méthodes propres aux Element comme :
			//sélectionner un nœud fils, modifier du texte, etc...
			Element courant = (Element)i.next();

			// créer l'object Hotel

			hotels.add( new Hotel(
				courant.getChild("name").getText(),
				courant.getChild("address").getText(),
				courant.getChild("city").getText(),
				Integer.valueOf( courant.getChild("rate").getText() ) )
			);
		}
    };

	public List<Hotel> getHotels() {
		 	return hotels;
	};

}