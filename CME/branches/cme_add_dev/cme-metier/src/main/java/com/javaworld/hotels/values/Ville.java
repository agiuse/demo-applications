package com.javaworld.hotels.values;

public enum Ville {
	PARIS("Paris"), LONDRES("Londres");
	
	private String ville;
	
	private Ville(String ville) {
		this.ville=ville;
	}
	
	
	public String getVille() {
		return this.ville;
	}
	
	public void setVille(String ville) {
		this.ville=ville;
	}

	public String toString() {
		return this.ville;
	}
	
	public boolean equals(Ville ville) {
		return this.ville.equalsIgnoreCase(ville.getVille());
	}

}
