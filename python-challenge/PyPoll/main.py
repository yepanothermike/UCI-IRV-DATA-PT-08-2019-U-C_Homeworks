import os
import csv

# csvpath = os.path.join('..', 'Resources', 'budget_data.csv')
# csvpath
csvpath = os.path.join('/Users/mike/Documents/GitHub/UCI-IRV-DATA-PT-08-2019-U-C_Homeworks/python-challenge/PyPoll/Resources/election_data.csv')

voterID = []
county = []
candidate = []

with open(csvpath, newline="") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    
    csv_header = next(csvfile)
    
    for row in csvreader:
        voterID.append(row[0])
        county.append(row[1])
        candidate.append(row[1])
        
        
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

print(f'Total Votes: {len(date)}')

print('------------------------------------------')
# A complete list of candidates who received votes
# The percentage of votes each candidate won
# The total number of votes each candidate won

print(f'Net Profit/Losses: $ {sum(price_num)}')


print('------------------------------------------')
# The winner of the election based on popular vote.
print(f'Average Change: $ {sum(price_num)/len(date)}')

print('------------------------------------------')


# The greatest increase in profits (date and amount) over the entire period
print(f'Greatest Increase in Profits: {date[price_num.index(max(price_num))]} ({price[price_num.index(max(price_num))]})')
print(f'Greatest Decrease in Profits: {date[price_num.index(min(price_num))]} ({price[price_num.index(min(price_num))]})')





# The greatest decrease in profits (date and amount) over the entire period
# # Specify the file to write to
output_path = os.path.join("analysis.csv")

# Open the file using "write" mode. Specify the variable to hold the contents
with open(output_path, 'w') as csvfile:

    # Initialize csv.writer
    csvwriter = csv.writer(csvfile, delimiter=',')

    # Write rows (column headers)
    csvwriter.writerow([f'Total Months: {len(date)}'])
    csvwriter.writerow([f'Net Profit/Losses: $ {sum(price_num)}'])
    csvwriter.writerow([f'Average Change: $ {sum(price_num)/len(date)}'])
    csvwriter.writerow([f'Greatest Increase in Profits: {date[price_num.index(max(price_num))]} ({price[price_num.index(max(price_num))]})'])
    csvwriter.writerow([f'Greatest Decrease in Profits: {date[price_num.index(min(price_num))]} ({price[price_num.index(min(price_num))]})'])
