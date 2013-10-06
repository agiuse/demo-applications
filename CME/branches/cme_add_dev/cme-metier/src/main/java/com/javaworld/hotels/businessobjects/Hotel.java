// //////////////////////////////////////////////////////////////////////////////
// Hotel: $Source$
//
// Created : 15 nov. 2005 by jfsmart
// Last modified $Date$ by $Author$
// Revision: $Revision$
// Version : $ID$
// //////////////////////////////////////////////////////////////////////////////

package com.javaworld.hotels.businessobjects;

import com.javaworld.hotels.values.Ville;

/**
 * Une classe métier Hotel simplifiée
 * @author jfsmart
 */
public class Hotel {
    private String nom;

    private String adresse;

    private Ville ville;

    private int etoiles;

    /**
     * Constructeur par défaut.
     */
    public Hotel() {
        super();
    }

    /**
     * Constructeur initialisant complétement l'objet
     * @param nom
     * @param adresse
     * @param ville
     * @param etoiles
     */
    public Hotel(String nom, String adresse, Ville ville, int etoiles) {
        super();
        this.nom = nom;
        this.adresse = adresse;
        this.ville = ville;
        this.etoiles = etoiles;
    }

    /**
     * @return l'adresse de cet hotel
     */
    public String getAdresse() {
        return adresse;
    }

    /**
     * @param adresse l'adresse de cet hotel
     */
    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    /**
     * @return le nombre d'étoiles de cet hotel
     */
    public int getEtoiles() {
        return etoiles;
    }

    /**
     * @param etoiles le nombre d'étoiles de cet hotel
     */
    public void setEtoiles(int etoiles) {
        this.etoiles = etoiles;
    }

    /**
     * @return le nom de cet hotel
     */
    public String getNom() {
        return nom;
    }

    /**
     * @param nom le nom de cet hotel
     */
    public void setNom(String nom) {
        this.nom = nom;
    }

    /**
     * @return la ville dans laquelle est situé cet hotel
     */
    public Ville getVille() {
        return ville;
    }

    /**
     * @param ville la ville dans laquelle est situé cet hotel
     */
    public void setVille(String ville) {
        this.ville.setVille(ville);
    }

    /**
     * @param ville la ville dans laquelle est situé cet hotel
     */
    public void setVille(Ville ville) {
        this.ville = ville;
    }

}
