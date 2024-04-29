import bs4
from markdownify import markdownify as md
import requests
import os

def get_ocaml_api_docs():
    # Ensure the directory for output exists
    output_dir = "ocaml-api-docs"
    os.makedirs(output_dir, exist_ok=True)

    # Open links.txt and process each link
    with open('links.txt', 'r') as file:
        for url in file:
            print(f"Processing {url}")
            url = url.strip()
            response = requests.get(url)
            if response.status_code == 200:
                soup = bs4.BeautifulSoup(response.text, 'html.parser')
                content = soup.find('header')
                if content:
                    # Collect all subsequent siblings of the first h2 tag
                    elements = list(content.find_next_siblings())
                    full_content = ''.join(str(element) for element in elements)
                    markdown_content = md(full_content, heading_style="ATX")
                    # Save the markdown content to a file
                    # https://v2.ocaml.org/api/Array.html -> Array
                    filename_without_ext = url.split('/')[-1].split('.')[0]
                    filename = os.path.join(
                        output_dir, f"{filename_without_ext}.md"
                    )
                    print(f"Writing {filename}")
                    with open(filename, 'w') as md_file:
                        md_file.write(markdown_content)
            else:
                print(f"Failed to fetch {url}")

def concat_files():
    dir_path = "ocaml-api-docs"
    files = os.listdir(dir_path)
    with open(os.path.join(dir_path, "concat.md"), "w") as outfile:
        for fname in files:
            with open(os.path.join(dir_path, fname)) as infile:
                outfile.write(infile.read())

concat_files()

