# Welcome to extractmi!

A NodeJS API that Extracts URL details  such as Article title, Image, Description, Authors and keywords.


If you are not willing to host this API , you can signup and  use my API for free and mine  upto 10,000 URLs per day.


# Requirements

This API uses Newspaper3k Python Library

 1. [NewsPaper3k](https://github.com/codelucas/newspaper)
 2. NodeJS >=8.0
 3. MySQL

## Install NewsPaper3k

Follow [this](https://github.com/codelucas/newspaper) guide on how to install Python NewsPaper3k library

## Clone Repo

    git clone https://github.com/hobsRKM/extractmi.git

## Configure Database
Create a database and create the following tables.

    --
    -- Table structure for table `api_hit_log`
    --
    
    CREATE TABLE `api_hit_log` (
      `id` int(11) NOT NULL,
      `ap_key_id` int(11) NOT NULL,
      `hits` int(11) NOT NULL,
      `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
    
    -- --------------------------------------------------------
    
    --
    -- Table structure for table `api_key`
    --
    
    CREATE TABLE `api_key` (
      `id` int(11) NOT NULL,
      `user_id` int(11) NOT NULL,
      `api_key` varchar(255) DEFAULT NULL,
      `hits` int(11) NOT NULL DEFAULT '0',
      `last_used_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
    
    -- --------------------------------------------------------
    
    --
    -- Table structure for table `api_log`
    --
    
    CREATE TABLE `api_log` (
      `id` int(11) NOT NULL,
      `api_id` int(11) NOT NULL,
      `url` tinytext NOT NULL,
      `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
    
    -- --------------------------------------------------------
    
    --
    -- Table structure for table `users`
    --
    
    CREATE TABLE `users` (
      `id` int(11) NOT NULL,
      `user_name` varchar(255) NOT NULL,
      `password` varchar(255) NOT NULL,
      `email` varchar(255) NOT NULL,
      `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
    
    --
    -- Indexes for dumped tables
    --
    
    --
    -- Indexes for table `api_hit_log`
    --
    ALTER TABLE `api_hit_log`
      ADD PRIMARY KEY (`id`);
    
    --
    -- Indexes for table `api_key`
    --
    ALTER TABLE `api_key`
      ADD PRIMARY KEY (`id`);
    
    --
    -- Indexes for table `api_log`
    --
    ALTER TABLE `api_log`
      ADD PRIMARY KEY (`id`);
    
    --
    -- Indexes for table `users`
    --
    ALTER TABLE `users`
      ADD PRIMARY KEY (`id`);
    
    --
    -- AUTO_INCREMENT for dumped tables
    --
    
    --
    -- AUTO_INCREMENT for table `api_hit_log`
    --
    ALTER TABLE `api_hit_log`
      MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
    --
    -- AUTO_INCREMENT for table `api_key`
    --
    ALTER TABLE `api_key`
      MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
    --
    -- AUTO_INCREMENT for table `api_log`
    --
    ALTER TABLE `api_log`
      MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
    --
    -- AUTO_INCREMENT for table `users`
    --
    ALTER TABLE `users`
      MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

## Run application

    node app.js

## How to use the API

 - Generate an API Key by signing up
 - Use the key in the following end point
		 - `https://localhost/api?url=<ARTICLE_URL>&key=<YOUR_API_KEY>`

                    
--------------------



            
    MIT License
    
    Copyright (c) 2020 Yuvaraj Mudaliar
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

                           
