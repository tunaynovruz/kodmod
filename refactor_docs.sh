#!/bin/bash

# Script to refactor all markdown files in docs folder
# 1. Remove "## Giriş" lines
# 2. Remove "Nəticə" sections (header and content)
# 3. Add <details> tags around Java code snippets if missing

DOCS_DIR="/Users/tunay.novruzov/Desktop/development/projects/kodmod/docs"

echo "Starting refactoring of markdown files..."
echo "Processing files in: $DOCS_DIR"

# Counter for processed files
count=0

# Function to process a single file
process_file() {
    local file="$1"
    local temp_file=$(mktemp)
    local temp_file2=$(mktemp)
    
    echo "Processing: $file"
    
    # Step 1: Remove "## Giriş" lines and "Nəticə" sections
    local in_netica_section=false
    
    while IFS= read -r line; do
        # Skip "## Giriş" lines
        if [[ "$line" == "## Giriş" ]]; then
            continue
        fi
        
        # Check if we're entering a Nəticə section
        if [[ "$line" == "## Nəticə" ]]; then
            in_netica_section=true
            continue
        fi
        
        # Skip lines if we're in a Nəticə section
        if [[ "$in_netica_section" == true ]]; then
            # Check if we've reached the end of the section (next ## header or end of file)
            if [[ "$line" =~ ^##[[:space:]] ]] && [[ "$line" != "## Nəticə" ]]; then
                in_netica_section=false
                echo "$line" >> "$temp_file"
            fi
            continue
        fi
        
        # Write the line if not in Nəticə section
        echo "$line" >> "$temp_file"
        
    done < "$file"
    
    # Step 2: Add <details> tags around Java code snippets if missing
    local in_java_block=false
    local in_details_block=false
    local java_lines=()
    
    while IFS= read -r line; do
        # Check if we're entering a details block
        if [[ "$line" == "<details>" ]]; then
            in_details_block=true
            echo "$line" >> "$temp_file2"
            continue
        fi
        
        # Check if we're exiting a details block
        if [[ "$line" == "</details>" ]]; then
            in_details_block=false
            echo "$line" >> "$temp_file2"
            continue
        fi
        
        # If we're in a details block, just write the line
        if [[ "$in_details_block" == true ]]; then
            echo "$line" >> "$temp_file2"
            continue
        fi
        
        # Check for Java code block start
        if [[ "$line" == '```java' ]]; then
            in_java_block=true
            java_lines=()
            java_lines+=("$line")
            continue
        fi
        
        # Check for code block end
        if [[ "$line" == '```' ]] && [[ "$in_java_block" == true ]]; then
            in_java_block=false
            java_lines+=("$line")
            
            # Wrap the Java code in details tags
            echo "" >> "$temp_file2"
            echo "<details>" >> "$temp_file2"
            echo "<summary>Koda bax</summary>" >> "$temp_file2"
            echo "" >> "$temp_file2"
            for java_line in "${java_lines[@]}"; do
                echo "$java_line" >> "$temp_file2"
            done
            echo "</details>" >> "$temp_file2"
            continue
        fi
        
        # If we're inside a Java block, collect the lines
        if [[ "$in_java_block" == true ]]; then
            java_lines+=("$line")
            continue
        fi
        
        # Regular line, just write it
        echo "$line" >> "$temp_file2"
        
    done < "$temp_file"
    
    # Replace original file with processed content
    mv "$temp_file2" "$file"
    rm -f "$temp_file"
}

# Find all .md files and process them
find "$DOCS_DIR" -name "*.md" -type f | while read -r file; do
    process_file "$file"
    ((count++))
done

echo "Refactoring completed. Processed files."