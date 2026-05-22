#!/usr/bin/env python3

import os
import subprocess

# =====================================================
# EASYRSA DIRECTORY
# =====================================================

EASYRSA_DIR = r"C:\Users\Dell\Desktop\EasyRSA-3.2.6-win64\EasyRSA-3.2.6"

# =====================================================
# RUN EASYRSA COMMAND
# =====================================================

def run_easyrsa(command):

    full_command = f"bash easyrsa {command}"

    print(f"\n[+] Running:")
    print(full_command)

    result = subprocess.run(
        full_command,
        shell=True,
        cwd=EASYRSA_DIR
    )

    if result.returncode != 0:

        print("\n[-] Command Failed")
        return False

    return True

# =====================================================
# INITIALIZE PKI
# =====================================================

def initialize():

    if not os.path.exists(
        os.path.join(EASYRSA_DIR, "pki")
    ):

        run_easyrsa("init-pki")

    if not os.path.exists(
        os.path.join(EASYRSA_DIR, "pki", "ca.crt")
    ):

        run_easyrsa("build-ca nopass")

# =====================================================
# CREATE CLIENT
# =====================================================

def create_client(client_name):

    cert_path = os.path.join(
        EASYRSA_DIR,
        "pki",
        "issued",
        f"{client_name}.crt"
    )

    key_path = os.path.join(
        EASYRSA_DIR,
        "pki",
        "private",
        f"{client_name}.key"
    )

    if os.path.exists(cert_path):

        print(f"\n[!] Client already exists: {client_name}")
        return

    success = run_easyrsa(
        f"build-client-full {client_name} nopass"
    )

    if success:

        print("\n================================")
        print("[+] CLIENT GENERATED SUCCESSFULLY")
        print("================================")

        print(f"\nCertificate:")
        print(cert_path)

        print(f"\nPrivate Key:")
        print(key_path)

# =====================================================
# MAIN
# =====================================================

def main():

    print("\n================================")
    print(" EASYRSA AUTOMATION ")
    print("================================")

    os.chdir(EASYRSA_DIR)

    initialize()

    while True:

        client_name = input(
            "\nEnter Client Name ('exit' to quit): "
        ).strip()

        if client_name.lower() == "exit":
            break

        if client_name == "":
            continue

        create_client(client_name)

# =====================================================

if __name__ == "__main__":
    main()