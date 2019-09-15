import os
import csv
import numpy as np

# csvpath = os.path.join('..', 'Resources', 'budget_data.csv')
# csvpath
csvpath = os.path.join('/Users/mike/Documents/GitHub/UCI-IRV-DATA-PT-08-2019-U-C_Homeworks/python-challenge/PyPoll/Resources/election_data.csv')
#csvpath = os.path.join('..','Resources/election_data.csv')

voterID = []
county = []
allvotes = []

with open(csvpath, newline="") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    
    csv_header = next(csvfile)
    
    for row in csvreader:
        voterID.append(row[0])
        county.append(row[1])
        allvotes.append(row[1])

# get total number of votes
votes_tot = len(voterID)

# get number of unique candidates (probably dont know ahead of time due to write in's)
candidates = np.unique(allvotes)
candidate_votes = np.zeros(len(candidates))

# get a list of unique candiates and count the number of votes they got

# initialize row index
i = 0
# for all candidates count then number of votes
for candidate in candidates:
    candidate_votes[i] = allvotes.count(candidates[i])
    i = i+1

# Election Results
# -------------------------
# Total Votes: 3521001
# -------------------------
# Khan: 63.000% (2218231)
# Correy: 20.000% (704200)
# Li: 14.000% (492940)
# O'Tooley: 3.000% (105630)
# -------------------------
# Winner: Khan
# -------------------------
    
#In addition, your final script should both print the analysis to the terminal and export a text file with the results.
#  ```
print('Election Results')
print('------------------------------------------')

# The total number of months included in the dataset# The total number of votes cast
print(f'Total Votes: {votes_tot}')
print('------------------------------------------')

# A complete list of candidates who received votes
# The percentage of votes each candidate won
# The total number of votes each candidate won

# initialize row index
i = 0
for candidate in candidates:
    print(f'{candidates[i]}: {round(candidate_votes[i]/votes_tot, ndigits=5)*100} % ({candidate_votes[i]})')
    i = i+1

print('------------------------------------------')
# The winner of the election based on popular vote.
# find the index of the maximum votes
winner_i = candidate_votes.argmax(axis=0)

print(f'Winner: {candidates[winner_i]} ({candidate_votes[winner_i]})')

print('------------------------------------------')

# The greatest decrease in profits (date and amount) over the entire period
# # Specify the file to write to
output_path = os.path.join("analysis.csv")

# Open the file using "write" mode. Specify the variable to hold the contents
with open(output_path, 'w') as csvfile:

    # Initialize csv.writer
    csvwriter = csv.writer(csvfile)

    # Write rows (column headers)]})'])

    csvwriter.writerow(['Election Results'])
    csvwriter.writerow(['------------------------------------------'])
    
    # The total number of months included in the dataset# The total number of votes cast
    csvwriter.writerow([f'Total Votes: {votes_tot}'])
    csvwriter.writerow(['------------------------------------------'])
    
    # A complete list of candidates who received votes
    # The percentage of votes each candidate won
    # The total number of votes each candidate won
    
    # initialize row index
    i = 0
    for candidate in candidates:
        csvwriter.writerow([f'{candidates[i]}: {round(candidate_votes[i]/votes_tot, ndigits=5)*100} % ({candidate_votes[i]})'])
        i = i+1
    
    csvwriter.writerow(['------------------------------------------'])
    # The winner of the election based on popular vote.
    # find the index of the maximum votes
    winner_i = candidate_votes.argmax(axis=0)
    
    csvwriter.writerow([f'Winner: {candidates[winner_i]} ({candidate_votes[winner_i]})'])
