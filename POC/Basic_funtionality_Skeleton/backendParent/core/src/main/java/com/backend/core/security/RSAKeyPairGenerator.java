package com.backend.core.security;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.Base64;

public class RSAKeyPairGenerator {
	
	private PrivateKey privateKey;
	private PublicKey publicKey;

	public RSAKeyPairGenerator() throws NoSuchAlgorithmException {
		KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
		keyGen.initialize(1024);
		KeyPair pair = keyGen.generateKeyPair();
		this.privateKey = pair.getPrivate();
		this.publicKey = pair.getPublic();
	}

	public String getPrivateKey() {
		return Base64.getEncoder().encodeToString(this.privateKey.getEncoded());
	}

	public String getPublicKey() {
		return Base64.getEncoder().encodeToString(this.publicKey.getEncoded());
	}

}
