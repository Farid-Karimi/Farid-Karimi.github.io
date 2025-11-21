package main

import (
	"strings"

	"github.com/charmbracelet/lipgloss"
)

type Project struct {
	name        string
	description string
	tools       []string
}

var projects = []Project{{
	name:        "Movie Recommendation System",
	description: "CineMatch is a movie recommendation system designed to provide personalized movie suggestions. It builds on data from The Movie Database (TMDb) and MovieLens to deliver relevant recommendations.",
	tools:       []string{"TMDb", "MovieLens", "Python"},
}, {
	name:        "AI-Powered Burnout Coach",
	description: "Equa is a comprehensive system for burnout detection that uses machine learning and a large language model (LLM) to provide a proactive approach to workplace wellness through analyzing key employee metrics.",
	tools:       []string{"Machine Learning", "LLM", "AI"},
}, {
	name:        "Sentiment Analysis for Fine-Grained Classification",
	description: "A fine-grained sentiment analysis project exploring classical and modern approaches to classify subtle emotional cues. Implementations include SVMs, RNNs, and transformer-based models (BERT / DistilBERT) using PyTorch.",
	tools:       []string{"PyTorch", "BERT", "DistilBERT", "SVM", "RNN"},
}, {
	name:        "Pac-Man — Simplified CLI Version",
	description: "A Pac-Man inspired game with randomly generated maps, custom colors, and a leaderboard. Maze generation uses DFS, ghost behavior is driven by BFS, and visuals are rendered using ASCII art.",
	tools:       []string{"CLI", "ASCII Art", "DFS", "BFS"},
}}

func getProjectsView(m Model, width, height int) string {
	boldStyle := m.renderer.NewStyle().
		Foreground(m.theme.primary).
		Bold(true)

	boldNonePrimary := m.renderer.NewStyle().
		Foreground(m.theme.foreground).
		Bold(true)

	projectsStyle := m.renderer.NewStyle().
		Width(width).
		Height(height)

	usableHeight := height - 2
	usableWidth := width - 6

	projectsText := boldStyle.Render("# Projects:") + "\n\n"

	var toolStyle = m.renderer.NewStyle().
		Border(lipgloss.RoundedBorder()).
		Padding(0, 1).MarginRight(1)
	for i, p := range projects {
		var toolsText []string
		if len(p.tools) > 0 {
			for _, tool := range p.tools {
				toolsText = append(toolsText, toolStyle.Render(tool))
			}
		}

		projectText := m.renderer.NewStyle().
			Width(usableWidth - 3).
			MarginLeft(3).
			Render("" + p.description + "\n" + wrapAndJoin(toolsText, usableWidth-3))
		projectContainer := m.renderer.NewStyle().
			Width(usableWidth).
			Render(boldNonePrimary.Render("## "+p.name) + "\n\n" + projectText)

		projectsText += projectContainer
		if i < len(projects)-1 {
			projectsText += "\n\n\n"
		}
	}

	projectsContent := m.renderer.NewStyle().
		Width(usableWidth).
		Height(usableHeight).
		Render(projectsText)

	totalLines := lipgloss.Height(projectsContent)
	scrollViewTotalLines = totalLines
	scrollViewUsableHeight = usableHeight
	if totalLines > usableHeight {
		projectsContentLines := strings.Split(projectsContent, "\n")
		startLine := m.scrollOffset
		endLine := min(int(startLine)+usableHeight, totalLines)
		projectsContent = strings.Join(projectsContentLines[startLine:endLine], "\n")
	}

	topStyle := m.renderer.NewStyle().
		Width(usableWidth).
		Height(1).
		Align(lipgloss.Center)

	bottomStyle := m.renderer.NewStyle().
		Width(usableWidth).
		Height(1).
		Align(lipgloss.Center)

	top := ""
	bottom := ""

	if m.scrollOffset != 0 {
		top = topStyle.Render("⌃")
	}
	if m.scrollOffset+usableHeight < totalLines {
		bottom = bottomStyle.Render("⌄")
	}

	return projectsStyle.Render(
		lipgloss.Place(width, height, lipgloss.Center, lipgloss.Center, top+"\n"+projectsContent+"\n"+bottom),
	)
}
