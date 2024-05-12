import csv

def filter_duplicates(input_file, output_file):
    unique_links = set()

    # Read the input CSV file and extract unique links
    with open(input_file, 'r', newline='') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)  # Skip the header row
        for row in reader:
            link = row[0]  # Assuming the link is in the first column
            unique_links.add(link)

    # Write unique links to the output CSV file
    with open(output_file, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['Game Links'])
        for link in unique_links:
            writer.writerow([link])

    print(f"Unique links saved to {output_file}")

if __name__ == '__main__':
    input_file = './game_links.csv'  
    output_file = './filtered_links.csv'
    filter_duplicates(input_file, output_file)
