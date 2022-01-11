import sqlite3
from pathlib import Path

db_path = 'db/identifier.sqlite'
con = sqlite3.connect(db_path, check_same_thread=False)
cur = con.cursor()

cur.execute("DROP TABLE messages")

# Create table
cur.execute('''CREATE TABLE messages
               (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, message text, clap int)''')

# Insert a row of data
cur.execute("INSERT INTO messages VALUES (0, 'adminitstrator', 'Welcome to message board!', 10000000)")

# Save (commit) the changes
con.commit()

# We can also close the connection if we are done with it.
# Just be sure any changes have been committed or they will be lost.
con.close()