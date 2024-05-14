import pandas as pd
import os

# Path to your CSV file
csv_file_path = './game_details.csv'
# Path to your images directory
images_directory_path = '/public/game_images'

# Read the CSV file
df = pd.read_csv(csv_file_path, header=None, names=["Title", "Release Date", "Score", "Developer", "Publisher", "Genre", "Platforms", "Image URL"])

# Function to generate local image path based on the title
def get_local_image_path(title):
    # Normalize the title to match your file naming convention
    filename = title.replace(' & ', '_').replace(':', '').replace(' ', '_') + '.jpg'
    filepath = os.path.join(images_directory_path, filename)
    if os.path.exists(filepath):
        return filepath
    return None

# Update the 'Image URL' column with local image paths
df['Image URL'] = df['Title'].apply(get_local_image_path)

# Save the modified DataFrame back to CSV
df.to_csv('./new_game_details', index=False)
