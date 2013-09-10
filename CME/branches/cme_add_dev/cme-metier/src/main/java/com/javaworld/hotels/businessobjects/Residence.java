// //////////////////////////////////////////////////////////////////////////////
// Residence: $Source$
// TODO Class summary goes here
//
// Created : Sept 10 2013 by eagius
// Last modified $Date$ by $Author$
// Revision: $Revision$
// Version : $ID$
// Copyright (c) 2005
// //////////////////////////////////////////////////////////////////////////////

package com.javaworld.hotels.businessobjects;

/**
 * Une classe métier Residence simplifiée
 * @author eagius
 */
public class Residence {
    private String nom;

    private String adresse;

    private String ville;

    private int etoiles;

    /**
     * Constructeur par défaut.
     */
    public Residence() {
        super();
    }

    /**
     * Constructeur initialisant complétement l'objet
     * @param nom
     * @param adresse
     * @param ville
     * @param etoiles
     */
    public Residence(String nom, String adresse, String ville, int etoiles) {
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
    public String getVille() {
        return ville;
    }

    /**
     * @param ville la ville dans laquelle est situé cet hotel
     */
    public void setVille(String ville) {
        this.ville = ville;
    }

}
