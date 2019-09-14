import os
import csv
import statistics

# csvpath = os.path.join('..', 'Resources', 'budget_data.csv')
# csvpath
csvpath = os.path.join('/Users/mike/Documents/GitHub/UCI-IRV-DATA-PT-08-2019-U-C_Homeworks/python-challenge/PyBank/Resources/budget_data.csv')

date = []
price = []
price_num = []

with open(csvpath, newline="") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    
    csv_header = next(csvfile)
    
    for row in csvreader:
        date.append(row[0])
        price.append(row[1])

# convert to float
for row in price:
    price_num.append(float(row))
        
# As an example, your analysis should look similar to the one below:

#  ```text
#  Financial Analysis
#  ----------------------------
#  Total Months: 86
#  Total: $38382578
#  Average  Change: $-2315.12
#  Greatest Increase in Profits: Feb-2012 ($1926159)
#  Greatest Decrease in Profits: Sep-2013 ($-2196167)
#  ```
print('Financial Analysis')
print('------------------------------------------')
  # The total number of months included in the dataset
print(f'Total Months: {len(date)}')

# The net total amount of "Profit/Losses" over the entire period
print(f'Net Profit/Losses: $ {sum(price_num)}')

#The average of the changes in "Profit/Losses" over the entire period
print(f'Average Change: $ {sum(price_num)/len(date)}')

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
